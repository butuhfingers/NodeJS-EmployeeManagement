var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var employees = require('./app/employee/employeeController');
var payoutEngine = require("./app/employee/payoutEngine");

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));



app.get('/employees', function(req, resp){
    resp.render("employees", {employees: employees.load()});
});

app.get("/employees/new", function(req, resp){
    resp.render('employeeAdd', {});
});

app.post('/employees', function (req, resp){
    employees.add(req.body);
    resp.redirect("/employees");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.get("/employees/pay", function(req, resp){
    // resp.render('pay', {});
    payoutEngine.run(employees.load(), function(result){
        resp.render('pay', {title: "Payout", employees: result});
    });
});