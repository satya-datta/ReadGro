const WithDrawlrouter=require("express").Router();
const withdrawlcontroller=require("../controller/withdrawlrequestcontroller");
const connection = require("../backend");
WithDrawlrouter.post('/withdrawlrequests/:user_id', withdrawlcontroller.CreateWR);
WithDrawlrouter.get('/getwithdrawlrequests/:user_id', withdrawlcontroller.getWithdrawalRequests);

module.exports=WithDrawlrouter;
