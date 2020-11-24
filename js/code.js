function get_history() {
  return document.getElementById('history-value').innerText;
}

function print_history(num) {
  document.getElementById('history-value').innerText = num;
}

function get_output() {
  return document.getElementById('output-value').innerText;
}

function print_output(num) {
  if (num == '') {
    document.getElementById('output-value').innerText = num;
  } else {
    document.getElementById('output-value').innerText = get_formatted_number(
      num
    );
  }
}

function get_formatted_number(num) {
  if (num == '-') {
    return '';
  }
  var n = Number(num);
  var value = n.toLocaleString('en');
  return value;
}

function reverse_number_format(num) {
  return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName('operator');

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function () {
    if (this.id == 'clear') {
      print_history('');
      print_output('');
    } else if (this.id == 'backspace') {
      var output = reverse_number_format(get_output()).toString();

      if (output) {
        output = output.substr(0, output.length - 1);
        print_output(output);
      }
    } else {
      var output = get_output();
      var history = get_history();

      if (output == '' && history != '') {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }

      if (output != '' || history != '') {
        output = output == '' ? output : reverse_number_format(output);
        history = history + output;

        if (this.id == '=') {
          var result = eval(history);
          print_output(result);
          print_history('');
        } else {
          history = history + this.id;
          print_history(history);
          print_output('');
        }
      }
    }
  });
}

var number = document.getElementsByClassName('number');

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function () {
    let output = reverse_number_format(get_output());
    if (output != NaN) {
      output = output + this.id;
      print_output(output);
    }
  });
}
