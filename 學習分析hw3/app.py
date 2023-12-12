import sys
import configparser
import spacy
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient
from flask import Flask, request, abort
from linebot.v3 import WebhookHandler
from linebot.v3.exceptions import InvalidSignatureError
from linebot.v3.webhooks import MessageEvent, TextMessageContent
from linebot.v3.messaging import Configuration, ApiClient, MessagingApi, ReplyMessageRequest, TextMessage

# Config Parser
config = configparser.ConfigParser()
config.read('config.ini')

credential = AzureKeyCredential(config['AzureLanguage']['API_KEY'])

app = Flask(__name__)

channel_access_token = config['Line']['CHANNEL_ACCESS_TOKEN']
channel_secret = config['Line']['CHANNEL_SECRET']
if channel_secret is None:
    print('Specify LINE_CHANNEL_SECRET as an environment variable.')
    sys.exit(1)
if channel_access_token is None:
    print('Specify LINE_CHANNEL_ACCESS_TOKEN as an environment variable.')
    sys.exit(1)

handler = WebhookHandler(channel_secret)

configuration = Configuration(
    access_token=channel_access_token
)

# 初始化 spaCy
nlp = spacy.load('en_core_web_sm')

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # parse webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

@handler.add(MessageEvent, message=TextMessageContent)
def message_text(event):
    sentiment_result, confidence_scores, mined_opinions = azure_sentiment(event.message.text)

    # 提取 mined_opinions
    subjects = [opinion.target.text for opinion in mined_opinions]

    # 合併多個主詞成一個字串，如果沒有主詞，使用預設值
    if subjects:
        subject_message = ', '.join(subjects)
    else:
        subject_message = "找不到主詞"

    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        line_bot_api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=f"{sentiment_result}\n分數：{confidence_scores}\n主詞：{subject_message}")]
            )
        )

def azure_sentiment(user_input):
    text_analytics_client = TextAnalyticsClient(
        endpoint=config['AzureLanguage']['END_POINT'],
        credential=credential
    )
    documents = [user_input]
    response = text_analytics_client.analyze_sentiment(
        documents,
        show_opinion_mining=True,
        language="zh-Hant"
    )
    print(response)
    docs = [doc for doc in response if not doc.is_error]
    mined_opinions = []

    for idx, doc in enumerate(docs):
        print(f"文本：{documents[idx]}")
        print(f"整体情感：{doc.sentiment}")
        confidence_scores = doc.confidence_scores
        print(f"置信度：{confidence_scores}")

        # 提取 mined_opinions
        mined_opinions.extend(doc.sentences[0].mined_opinions)

    # 將情感結果轉換為中文描述
    if not docs:
        return "無法分析情感", None, []
    
    sentiment_result = docs[0].sentiment
    confidence_scores = docs[0].confidence_scores
    if sentiment_result == "positive":
        return "正向", confidence_scores, mined_opinions
    elif sentiment_result == "negative":
        return "負向", confidence_scores, mined_opinions
    else:
        return "中立", confidence_scores, mined_opinions

if __name__ == "__main__":
    app.run()
