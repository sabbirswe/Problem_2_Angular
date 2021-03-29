import { IReportData } from './../model/IReportData';
import { ITimeSeries } from '../model/ITimesSeries';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesService {

  baseUrl = 'https://localhost:44315/api/';
  constructor(private http: HttpClient) {}

  getTimeSeriesChart(){
    return this.http.get<ITimeSeries>(this.baseUrl + 'timeSeries/get-time-series-chart');
  }

  getTimeSeriesChartData(buildingId:number,objectId:number,datafildId:number,timeStamp:Date){
    return this.http.get<IReportData>(this.baseUrl + 'timeSeries/get-time-series-chart-data?buildingId='+buildingId+"&objectId="+objectId+"&datafildId="+datafildId+"&timeStamp="+timeStamp);
  }

}
