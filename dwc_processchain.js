(function() { 
	//HTML DOM과는 별개로 존재하는 이 Custom Widget 만을위한 Shadow Dom 에 대한 템플릿.
	//:host 스타일은 템플릿 요소에 반영됨 
	let template = document.createElement("template");
	template.innerHTML = `
		<div class="df-process-chain">
			테스트 Obj
		</div>
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
		}

        
	}

	customElements.define("net-dfocus-dwc-processchain", dwcProcessChainFlow);
})();