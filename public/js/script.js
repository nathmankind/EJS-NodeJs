const handleSubmit = () => {
  return false;
  let response = {};
  let errors;
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let email = document.getElementById("email").value;
  let city = document.getElementById("city").value;
  let province = document.getElementById("province").value;
  let phone = document.getElementById("phone").value;
  let product1 = document.getElementById("product1").value;
  let product2 = document.getElementById("product2").value;
};

const err1 = [
    {
        type: 'field',
        value: '',
        msg: 'Must have a name',
        path: 'name',
        location: 'body'
      },
      {
        type: 'field',
        value: '',
        msg: 'Must have email',
        path: 'email',
        location: 'body'
      },
      {
        type: 'field',
        value: '',
        msg: 'Phone should be in the format xxx-xxx-xxxx',
        path: 'phone',
        location: 'body'
      },
      {
        type: 'field',
        value: '',
        msg: 'Enter a city',
        path: 'city',
        location: 'body'
      },
      {
        type: 'field',
        value: '',
        msg: 'Enter an address',
        path: 'address',
        location: 'body'
      }
]

