var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { responseData: null });
});

app.post('/submit', async (req, res) => {
  const { namespace_id, data, gas_limit, fee, node_url } = req.body;

  const encodedNamespaceId = Buffer.from(namespace_id).toString('hex').padEnd(16, '0').slice(0, 16);
  const encodedData = Buffer.from(data).toString('hex');

  req.body.namespace_id = encodedNamespaceId;
  req.body.data = encodedData;

  const payload = {
    namespace_id: encodedNamespaceId,
    data: encodedData,
    gas_limit: Number(gas_limit),
    fee: Number(fee),
  };

  try {
    const response = await axios.post(node_url, payload);
    const responseData = response.data;
    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
