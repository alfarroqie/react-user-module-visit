import React, {useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper"; 

import {getModuleVisitData} from './UserModuleVisit'

function ChartModuleVisit () {
  am4core.options.autoDispose = true;
  am4core.useTheme(am4themes_animated);

  useEffect(() => {
    //set style and data
    let chart = am4core.create("chartModuleVisit", am4charts.PieChart);
    chart.innerRadius = am4core.percent(40);
    chart.data = getModuleVisitData.apply();
    //set value
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "visit";
    pieSeries.dataFields.category = "name";
    pieSeries.slices.template.stroke = am4core.color("#fff");

    // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // // //grouping 
    let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
    grouper.threshold = 2.5;
    grouper.groupName = "Other";
    grouper.clickBehavior = "zoom";

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.valign = "middle";
    chart.legend.scrollable = true;
  });

  return (
    <>
        <div id="chartModuleVisit" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
}

export default ChartModuleVisit