sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createWeatherAPIModel: function() {
			var oModel = new JSONModel();
			oModel.setData({
				city: "",
				icon: "",
				country: "",
				cols: [{
					name: "Date"
				}, {
					name: "day Temperature"
				}, {
					name: "units"
				}, {
					name: "humidity"
				}],
				items: []
			});
			return oModel;
		}

	};
});