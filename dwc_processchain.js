//
var ajaxPromisify = (url, type, data, headers) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url,
			type,
			data,			
			headers,
			crossDomain: true,			
			success: function(response, status, xhr) {
				console.log(response);
				resolve({response, status, xhr});
			},
			error : function(response, status, xhr) {
				const err = new Error('xhr error');
				err.status = xhr.status;
				reject(err);
			}
		});
	});
}


(function() { 
	//HTML DOM과는 별개로 존재하는 이 Custom Widget 만을위한 Shadow Dom 에 대한 템플릿.
	//:host 스타일은 템플릿 요소에 반영됨 
	let template = document.createElement("template");
	template.innerHTML = `
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/alyssaxuu/flowy/flowy.min.css"> 
        <script src="https://cdn.jsdelivr.net/gh/alyssaxuu/flowy/flowy.min.js"></script>

		<div class="create-flowy" id="A">A</div>
        <div class="create-flowy" id="B">B</div>
        <div class="create-flowy" id="C">C</div>
        <div class="create-flowy" id="D">D</div>
        <div class="create-flowy" id="E">E</div>
        <div class="create-flowy" id="F">F</div>
        <div id="canvas"></div>

		<script>
		</script>

		<style>
		:host {			
			display: block;
		} 
		</style> 
	`;

	//Define Custom Element 
	class dwcProcessChainFlow extends HTMLElement {


		//Init될때 호출되는 항목
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}
		/*
		최초 실행시 실행 순서
		constructor()
		onCustomWidgetBeforeUpdate()
		Property setter functions, if present, to update the custom widget properties
		onCustomWidgetAfterUpdate()
		connectedCallback()


		*/
		onCustomWidgetBeforeUpdate(changedProperties) {
			// Custom widget 업데이트 이전 Call 되는 Function
			this._props = { ...this._props, ...changedProperties };
		}

		//Update 시점은? - Property 가 변결되는 시점 (edit 모드에서)
		onCustomWidgetAfterUpdate(changedProperties) {
			// Custom widget 업데이이후 Call 되는 항목
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
			console.log(changedProperties);
			
			// this.dwcApi(changedProperties, this);
		}

		async callFunc(url,type,data){
			const { response } = await ajaxPromisify(`https://dfocus.authentication.us10.hana.ondemand.com/oauth/authorize?response_type=code&client_id=sb-caab87cd-3fcb-4950-a98c-285d289f1a32!b33211|client!b655&redirect_uri=https://secure.bluelily.kr/bypass_oauth/callback`
													,'GET'
													,'data'
													,{
														// "X-CSRF-Token":'fetch',
														"Access-Control-Allow-Origin" : "https://dfocus-1.jp10.hanacloudservices.cloud.sap",
														"Content-Type": "application/json;charset=UTF-8;IEEE754Compatible=true"
												});
			console.log(response);
			return response.status;
		}

		// Custom Widget 이 DOM 에 연결될 때 호출됨
		connectedCallback(){
			console.log('connectedCallback');
		}


	}

	// dwcApi((changedProperties, that) => {
	// 	var that_ = that;
	// 	console.log('dwcApiCall');
		
	// })

	customElements.define("net-dfocus-dwc-processchain", dwcProcessChainFlow);

	
})();