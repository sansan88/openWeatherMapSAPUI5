sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("com.qperior.ti.u02500.demo.openweatherOpenWeatherSample.controller.Main", {
		onInit: function() {
			this._loadForecast("Schaffhausen,ch");
		},
		_mapResults: function(results) {
			var oModel = this.getView().getModel();
			var sIconUrl = encodeURI("http://openweathermap.org/img/w/" + results.list[0].weather[0].icon + ".png");
			oModel.setProperty("/icon", sIconUrl);
			oModel.setProperty("/city", results.city.name);
			oModel.setProperty("/country", results.city.country);
			var aForecastResults = [];
			for (var i = 0; i < results.list.length; i++) {
				var oTemp = results.list[i].main.temp;
				//var date = this._formatDate(results.list[i].dt + 1000);
				aForecastResults.push({
					date: results.list[i].dt_txt,
					temp: oTemp,
					units: "Celsius",
					humidity: results.list[i].main.humidity
				});
			}
			oModel.setProperty("/items", aForecastResults);
		},
		_loadForecast: function(sCity) {
			var oView = this.getView();
			var oParams = {
				q: sCity,
				units: "metric",
				appid: "c1800d38de0240a6cc8c1af1f4bdf209",
				cnt: 100,
				mode: "json"
			};
			var sUrl = "/OpenWeather/data/2.5/forecast"; // /daily geht nicht wegen API Plan
			oView.setBusy(true);
			var self = this;
			$.get(sUrl, oParams).done(function(results) {
				oView.setBusy(false);
				self._mapResults(results);
			}).fail(function(err) {
				oView.setBusy(false);
				if (err !== undefined) {
					var oErrorResponse = $.parseJSON(err.responseText);
					sap.m.MessageToast.show(oErrorResponse.message, {
						duration: 6000
					});
				} else {
					sap.m.MessageToast.show("unknown error!");
				}
			});
		},
		_onSearch: function(event) {
			this._loadForecast(event.mParameters.query);
		},
		_formatDate: function(date) {
			var d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();
			if (month.length < 2) {
				month = "0" + month;
			}
			if (day.length < 2) {
				day = "0" + day;
			}
			return [
				year,
				month,
				day
			].join("-");
		}
	});
});