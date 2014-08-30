class A {
	constructor () { }
}

function sample (a:string, b:number, c?:boolean): string {
	return "hello world"
}

function sample2 (a:string, b:A, c?:boolean) {
	return b
}

var str:A = sample2("hey", new A(), true);
