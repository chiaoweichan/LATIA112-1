//Bar Chart
let myBarChart=document.getElementById('myBarChart');
let tracebar_1 ={};
tracebar_1.type ="bar";
tracebar_1.name ="國立大學新生實際註冊人數";
tracebar_1.x =[];
tracebar_1.y =[];
tracebar_1.marker = {
    color:'lightpink'
}
for(let i=0;i<public.length;i++){
    tracebar_1.x[i] =public[i]['name'];
    tracebar_1.y[i] =public[i]['count'];
}

let tracebar_2 ={};
tracebar_2.type ="bar";
tracebar_2.name ="私立大學新生實際註冊人數"
tracebar_2.x =[];
tracebar_2.y =[];
tracebar_2.marker = {
    color:'lightblue'
}

for(let i=0; i<private.length; i++) {
    tracebar_2.x[i] =private[i]['name'];
    tracebar_2.y[i] =private[i]['count'];
}

let databar=[];
databar.push(tracebar_1);
databar.push(tracebar_2);

let layoutbar ={
    margin:{
        t:100,
        l:50,
    },
    title:'107-111學年度新生實際註冊人數比例',
     annotations: [
        {
            text: '由長條圖可以發現107-111學年度各學年國立大學新生實際註冊人數均少於私立大學新生實際註冊人數，<br>但國立大學新生實際註冊人數逐年微幅增長，而私立大學新生實際註冊人數卻逐年下降。',
            showarrow: false,
            x: 0.5,  
            y: 1, 
            xref: 'paper',
            yref: 'paper',
            xanchor: 'center',
            yanchor: 'bottom',
            font: {
                size: 14,
                color: 'brown'  
            }
        },
    ]
}

Plotly.newPlot(myBarChart, databar, layoutbar);

//Pie Chart
let myPieChart=document.getElementById('myPieChart');
let tracepie_1 ={};
tracepie_1.type ="pie";
tracepie_1.title = "111學年度"
tracepie_1.labels =[];
tracepie_1.values =[];
tracepie_1.hole =0.5;
tracepie_1.domain = {
    row : 0,
    column : 0
};
tracepie_1.pie = {
    color:'lightpink'
};
for(let x=0; x<level_111.length; x++){
    tracepie_1.labels[x] =level_111[x]['name'];
    tracepie_1.values[x] =level_111[x]['count'];
}


let tracepie_2 ={};
tracepie_2.type ="pie";
tracepie_2.title = "110學年度"
tracepie_2.labels =[];
tracepie_2.values =[];
tracepie_2.hole =0.5;
tracepie_2.domain = {
    row : 0,
    column : 1
};

for(let x=0; x<level_110.length; x++){
    tracepie_2.labels[x] =level_110[x]['name'];
    tracepie_2.values[x] =level_110[x]['count'];
}

let tracepie_3 ={};
tracepie_3.type ="pie";
tracepie_3.title = "109學年度"
tracepie_3.labels =[];
tracepie_3.values =[];
tracepie_3.hole =0.5;
tracepie_3.domain = {
    row : 0,
    column : 2
};

for(let x=0; x<level_109.length; x++){
    tracepie_3.labels[x] =level_109[x]['name'];
    tracepie_3.values[x] =level_109[x]['count'];
}

let tracepie_4 ={};
tracepie_4.type ="pie";
tracepie_4.title = "108學年度"
tracepie_4.labels =[];
tracepie_4.values =[];
tracepie_4.hole =0.5;
tracepie_4.domain = {
    row : 1,
    column : 0
};

for(let x=0; x<level_108.length; x++){
    tracepie_4.labels[x] =level_108[x]['name'];
    tracepie_4.values[x] =level_108[x]['count'];
}

let tracepie_5 ={};
tracepie_5.type ="pie";
tracepie_5.title = "107學年度"
tracepie_5.labels =[];
tracepie_5.values =[];
tracepie_5.hole =0.5;
tracepie_5.domain = {
    row : 1,
    column : 1
};

for(let x=0; x<level_107.length; x++){
    tracepie_5.labels[x] =level_107[x]['name'];
    tracepie_5.values[x] =level_107[x]['count'];
}

let datapie =[];
datapie.push(tracepie_1);
datapie.push(tracepie_2);
datapie.push(tracepie_3);
datapie.push(tracepie_4);
datapie.push(tracepie_5);


let layoutpie ={
    margin:{
        t:50,
        l:40
    },
    grid:{
        rows:2,
        columns:3
    },
    title:'107-111學年度核定招生等級名額比例',
    annotations: [
        {
            text: '由圓餅圖可以發現107-111學年度博士、碩士、學士核定的招生名額比例並沒有顯著增減。',
            showarrow: false,
            x: 0.5,  
            y: 0, 
            xref: 'paper',
            yref: 'paper',
            xanchor: 'center',
            yanchor: 'top',
            font: {
                size: 14,
                color: 'brown'  
            }
        },
    ]
}

Plotly.newPlot(myPieChart, datapie, layoutpie);

//Line Chart
let myLineChart=document.getElementById('myLineChart');

let traceline_1 ={};
traceline_1.mode ="lines+markers";
traceline_1.type ="scatter";
traceline_1.name ="總計";
traceline_1.marker={
    size:5,
};
traceline_1.x =[];
traceline_1.y =[];
traceline_1.text =[];

for(let i=0;i<total_admissions.length;i++){
    traceline_1.x[i] =total_admissions[i][0];
    traceline_1.y[i] =total_admissions[i][1];
    traceline_1.text[i] =total_admissions[i][2];
}

let traceline_2 ={};
traceline_2.mode ="lines+markers";
traceline_2.type ="scatter";
traceline_2.name ="國立";
traceline_2.marker={
    size:5
};
traceline_2.x =[];
traceline_2.y =[];
traceline_2.text =[];

for(let i=0;i<public_admissions.length;i++){
    traceline_2.x[i] =public_admissions[i][0];
    traceline_2.y[i] =public_admissions[i][1];
    traceline_2.text[i] =public_admissions[i][2];
}

let traceline_3 ={};
traceline_3.mode ="lines+markers";
traceline_3.type ="scatter";
traceline_3.name ="私立";
traceline_3.marker={
    size:5
};
traceline_3.x =[];
traceline_3.y =[];
traceline_3.text =[];

for(let i=0;i<private_admissions.length;i++){
    traceline_3.x[i] =private_admissions[i][0];
    traceline_3.y[i] =private_admissions[i][1];
    traceline_3.text[i] =private_admissions[i][2];
}
let data_line =[];
data_line.push(traceline_1);
data_line.push(traceline_2);
data_line.push(traceline_3);

let layout_line ={
    
    margin:{
        t:30,
        b:150,
    },
    
    yaxis:{
        range:[100000,400000]
    },
   
    
    title:'107-111學年度核定公私立招生名額比例',
    
    annotations: [
        {
            text: '由折線圖可以發現雖然國立大學107-111學年度核定的招生名額並沒有大幅增減，<br>但私立大學核定的招生名額逐年減少，導致大學總招生名額減少。',
            showarrow: false,
            x: 0.5,  
            y: -0.15, 
            xref: 'paper',
            yref: 'paper',
            xanchor: 'center',
            yanchor: 'top',
            font: {
                size: 16,
                color: 'brown'  
            }
        },
    ]
}
   
Plotly.newPlot(myLineChart, data_line, layout_line);

