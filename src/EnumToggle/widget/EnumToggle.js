// Enum Toggle, Chris de Gelder, Update to Mx 6 12/09/2015
define([
		"dojo/_base/declare",
		"mxui/widget/_WidgetBase",
		"dojo/dom-construct",
		"dojo/html",
		"dojo/_base/array"		
		

	], function (declare, _WidgetBase, dojoConstruct, dojoHtml, dojoArray) {
	"use strict";


	return declare('EnumToggle.widget.EnumToggle', [_WidgetBase], {

		//inputargs : {
		name : '',
		defaultpicture : '',
		notused : [], //value array, keep it compatible with mx4
		readonlyval : false,
		onChangemf : '',

		//IMPLEMENTATION
		contextGUID : null,
		caption : [],
		imgurls : [],
		imgalts : [],
		curindex : 0,
		img : null,
		attrHandle: null,
        _handles: null,		
        _alertDiv: null,
		
		
        constructor: function() {
            this._handles = [];
        },		

		postCreate : function () {
			var i;
			this.caption = [];
			this.imgurls = [];
			this.imgalts = [];
			// copy data from object array
			for (i = 0; i < this.notused.length; i+=1) {
				this.caption.push(this.notused[i].captions);
				this.imgurls.push(this.notused[i].pictures);
				this.imgalts.push(this.notused[i].alts);
			}
			this.img = dojo.doc.createElement('img');
			dojo.attr(this.img, {
				src : this.defaultpicture,
				style : {
					cursor : "pointer"
				}
			});
			this.domNode.appendChild(this.img);
			if (!this.readonlyval) {
				this.connect(this.img, 'onclick', dojo.hitch(this, this.onClick));
			}
			this.actLoaded();
		},
		update : function (obj, callback) {
			if (obj) {
				this.contextGUID = obj.getGuid();
				this._resetSubscriptions();			
			}
			if (callback) {
				callback();
			}
		},
		_setValueAttr : function (value) {
			var i = this.caption.indexOf(value);
			var imgurl = "";
			var imgalt = "";
			if ((i >= 0) && (i < this.caption.length)) {
				this.curindex = i;
				imgurl = this.imgurls[i];
				imgalt = this.imgalts[i];
			} else {
				// set the index to last of the enum so the click will put it to the first
				this.curindex = this.caption.length - 1;
				imgurl = this.defaultpicture;
				imgalt = "";
			}
			dojo.attr(this.img, {
				src : imgurl,
				alt : imgalt,
				title : imgalt
			});
			this._clearValidations();
		},
		_getValueAttr : function (value) {
			return this.caption[this.curindex];
		},
		//stub function, will be used or replaced by the client environment
		onChange : function () {},
		textChange : function (e) {
			this.onChange();
		},
		onClick : function (e) {
			console.log('onclick');
			this.curindex = (this.curindex >= this.caption.length - 1 ? 0 : this.curindex + 1);
			dojo.attr(this.img, {
				src : this.imgurls[this.curindex],
				title : this.imgalts[this.curindex]
			});
			this.onChange();
			var mf = this.onChangemf;
			if (mf != '') {
				var params = {
					params: {
						actionname : mf,
						applyto : 'selection',
						guids : [this.contextGUID]
					},
					callback : function () {},
					error : function () {}
				};
				mx.data.action(params);
			}
			this._clearValidations();
		},
        _handleValidation: function(validations) {
			console.log('validations', validations);
            this._clearValidations();

            var validation = validations[0],
                message = validation.getReasonByAttribute(this.name);

            if (this.readOnly) {
                validation.removeAttribute(this.name);
            } else if (message) {
                this._addValidation(message);
                validation.removeAttribute(this.name);
            }
        },

        // Clear validations.
        _clearValidations: function() {
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },

        // Show an error message.
        _showError: function(message) {
			console.log('message', message);
            if (this._alertDiv !== null) {
                dojoHtml.set(this._alertDiv, message);
                return true;
            }
            this._alertDiv = dojoConstruct.create("div", {
                "class": "alert alert-danger",
                "innerHTML": message
            });
            this.domNode.appendChild(this._alertDiv);
        },

        // Add a validation.
        _addValidation: function(message) {
            this._showError(message);
        },

        // Reset subscriptions.
        _resetSubscriptions: function() {
            // Release handles on previous object, if any.
            if (this._handles) {
                dojoArray.forEach(this._handles, function (handle) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions. 
            if (this.contextGUID) {
                var attrHandle = this.subscribe({
                    guid: this.contextGUID,
                    attr: this.backgroundColor,
                    callback: dojo.hitch(this, function(guid, attr, attrValue) {
                        this._setValueAttr(attrValue);
                    })
                });

                var validationHandle = this.subscribe({
                    guid: this.contextGUID,
                    val: true,
                    callback: dojo.hitch(this, this._handleValidation)
                });

                this._handles = [attrHandle, validationHandle ];
            }
        }
	});
});