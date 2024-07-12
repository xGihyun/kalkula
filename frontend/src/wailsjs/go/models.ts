export namespace backend {
	
	export class Equation {
	    id: string;
	    content: string;
	
	    static createFrom(source: any = {}) {
	        return new Equation(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.content = source["content"];
	    }
	}
	export class Workspace {
	    id: string;
	    name?: string;
	    position: number;
	
	    static createFrom(source: any = {}) {
	        return new Workspace(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.position = source["position"];
	    }
	}

}

