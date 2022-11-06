# How to Perform Validations

Step 1: For Text field,Email,Password,OTP,Mobile No validations in your form
import common_validations.js from 'src/utilities/common_validations'

Step 2: Invoke corresponding Validation function from the OnChange event handler of your input control.

Step 3: Based on the return value from Validation function store the value of input control or discard it.

# How to handle Errors

Step 1 : Add the error message to be displayed in 'src/helpers/components/error_messages.js'

Step 2 : Add switch case condition for error message in Validation function in 'src/utilities/common_validations'

Step 2 : Based on the return value from validation function display the errors in input control.
