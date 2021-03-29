import { IReportData } from './../model/IReportData';
import { TimeSeriesService } from './time-series.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import { ISelectList } from '../model/ISelectList';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);


@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements OnInit {


  //public data= cdata.TimeChartData;

public reportData:Array<any>=[];
    
    





   
   buildingList?: ISelectList[];
   objectList?: ISelectList[];
   dataFieldList?: ISelectList[];
   dataFieldId:number=0;
   objectId:number=0;
   buildingId:number=0;
   timeStamp?: Date;

  constructor(private timeSeriesService: TimeSeriesService){

    
  }

  ngOnInit(): void {
    this.getData();
   
    
    
  }





  getData(){
    this.timeSeriesService.getTimeSeriesChart().subscribe(res=>{
      this.buildingList=res.buildingSelectList; 
      this.objectList=res.objectsSelectList; 
      this.dataFieldList=res.dataFieldSelectList; 
      console.log(res.buildingSelectList);
    }, error => {
          console.log(error);
        });
    }

    getSearchRestult(){

      if(this.timeStamp !=undefined || this.timeStamp!=null){
        this.timeSeriesService.getTimeSeriesChartData(this.dataFieldId,this.objectId,this.dataFieldId,this.timeStamp!).subscribe(res=>{
      
      

         this.reportData= res.report;

        
         let options: any = {
            chart: {
               zoomType: 'x'
            },
            title: {
                text: 'Timeseries Data'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Value'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                   //  [0, Highcharts.getOptions().colors[0]],
                                   //  [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },
            series: [{
                        type: 'area',
                        name: 'Value',
                         data: this.reportData
                    }]
          }
          Highcharts.chart('container', options);
      //  this.reportData=res as any;
          
          


          
        }, error => {
          console.log(error);
        });

      }
       else{
        alert("Please Select Datarange");
       }
  
      
      
    }



    
}
