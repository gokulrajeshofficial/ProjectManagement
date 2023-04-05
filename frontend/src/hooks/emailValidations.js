export default function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input) {
    if (input.match(validRegex)) {

      return { status: true, errMessage: "" };
    } else {
      return { status: false, errMessage: "Invalid Email address" };
    }
  }else{
    return {status : false , errMessage : "Email Address is Required"}
  }

}