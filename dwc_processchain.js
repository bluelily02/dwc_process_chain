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
		
		<style>
		:host {			
			display: block;
		} 
		</style> 
	`;

	//Define Custom Element 
	class dwcProcessChainFlow extends HTMLElement {
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

		onCustomWidgetBeforeUpdate(changedProperties) {
			// Custom widget 업데이트 이전 Call 되는 Function
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			// Custom widget 업데이이후 Call 되는 항목
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}

			dwcApi
		}


	}

	customElements.define("net-dfocus-dwc-processchain", dwcProcessChainFlow);

	function dwcApi(changedProperties, that){
		var that_ = that;

		
	}
})();