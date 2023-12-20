
face=[
  k=>({"Browser": k,"Protocol-Version": "1.1"}),
  (title,k,id=crypto.randomUUID(), api='127.0.0.1:9229/'+k)=>({
    title,id,url:"file://"+k, description:k,type:"node", webSocketDebuggerUrl:"ws://"+api, devtoolsFrontendUrl:"devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws="+api
  })
]


{'json/version':face[0]("eval-polyfill/v1")
'json':face[1]("eval[str]", "CtrlC.js")}

api={
  callCon() {
    [ty(x)]
  },
  ty:x=>({"type":typeof x,"value":""+x}),
  genStk:(ex,f)=>(
    {callFrames:[{"functionName":"","scriptId":"0","url":"uneval:","lineNumber":40,"columnNumber":12}]}
  ),
  genProp:()=>(
    {"type":"object","description":"Object","overflow":false,"properties":[]
  ),
  marsh:(o)=>(
    {objectId, "type":"object","subtype":"error","className":"EvalError","description":"EvalError: Possible side-effect in debug-evaluate" }
  )
}
/**
 * 
 * {"id":107,"result":{"exceptionDetails":{"exceptionId":32,"text":"Uncaught","lineNumber":0,"columnNumber":2,"scriptId":"178","exception":{"type":"object","subtype":"error","className":"SyntaxError","description":"SyntaxError: Unexpected end of input","objectId":"-3994350382181079758.1.865"}}}}
 */
Runtime={
  enable:()=>({}),
  evaluate(expression, objectGroup,returnByValue, generatePreview){
    ex? {result:marsh(qAnon)} :
    c.exceptionDetails= {"exceptionId":52,"text":"Uncaught",...api.genStk(ex),"exception":marsh(ex,$Y)} 
    c.preview=api.prevProp()
  },
  consoleAPICalled(type,args, stackTrace, executionContextId=1, timestamp=now()){},
  getProperties({objectId,generatePreview, ownProperties,accessorPropertiesOnly,nonIndexedPropertiesOnly}){
    [{name,value:marsh(), isOwn}]
  },
  compileScript(expression,/*no URL*/) {},
  executionContextCreated(context={name:"clipboard",origin:'', uniqueId:"-9174546899003113763.-3435794673694859232",id:1,auxData:{isDefault:true}}) {},
  releaseObjectGroup(objectGroup){},
  releaseObject(objectId){},
  globalLexicalScopeNames:()=>({names:js`O.keys(globalThis)`})
}
Debugger={
  "":1,"hash":"b8bc0e4f01a0ebdbfe99180d4ea3cb49092d268fecd0789d2e9372fa616e9542","":{"isDefault":true},"isLiveEdit":false,"sourceMapURL":"","hasSourceURL":false,"isModule":false,"length":10,"scriptLanguage":"JavaScript","embedderName":""}
  scriptParsed(scriptId, url,startLine,startColumn,endLine,endColumn, executionContextId=1,executionContextAuxData={"isDefault":true}, )
}