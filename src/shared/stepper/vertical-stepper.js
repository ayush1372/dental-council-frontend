// import * as React from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Step from '@mui/material/Step';
// import StepContent from '@mui/material/StepContent';
// import StepLabel from '@mui/material/StepLabel';
// import Stepper from '@mui/material/Stepper';
// import Typography from '@mui/material/Typography';

// // const steps = [
// //   {
// //     label: 'Select campaign settings',
// //     description: `For each ad campaign that you create, you can control how much
// //               you're willing to spend on clicks and conversions, which networks
// //               and geographical locations you want your ads to show on, and more.`,
// //   },
// //   {
// //     label: 'Create an ad group',
// //     description:
// //       'An ad group contains one or more ads which target a shared set of keywords.',
// //   },
// //   {
// //     label: 'Create an ad',
// //     description: `Try out different ad text to see what brings in the most customers,
// //               and learn how to enhance your ads using features like ad extensions.
// //               If you run into any problems with your ads, find out how to tell if
// //               they're running and how to resolve approval issues.`,
// //   },
// // ];

// export default function VerticalLinearStepper({selectedRowData}) {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   const finalDates = [
//     applicationSubmittedDate,
//     applicationAtSMC,
//     finalCollegeDate,
//     applicationAtSMC,
//     applicationAtNMC,
//   ];
//   const stepStatus = [
//     {
//       type: doctor_status?.value.toLowerCase(),
//       label: doctor_status?.value,
//     },
//     {
//       type: smc_status?.value.toLowerCase(),
//       label: smc_status?.value,
//     },
//     {
//       type: collegeVerificationStatus?.value?.toLowerCase(),
//       label: collegeVerificationStatus?.value,
//     },
//     {
//       type: smc_status?.value.toLowerCase(),
//       label: smc_status?.value,
//     },
//     {
//       type: nmc_status?.value.toLowerCase(),
//       label: nmc_status?.value,
//     },
//   ];
//   const {
//     created_at,
//     smc_action_date,
//     college_registrar_action_date,
//     college_dean_action_date,
//     nmc_action_date,
//     doctor_status,
//     nmc_status,
//     collegeVerificationStatus,
//     smc_status,
//   } = selectedRowData;
//   let applicationSubmittedDate = new Date(created_at?.value).toDateString();
//   let applicationAtSMC;
//   if (smc_action_date?.value) {
//     applicationAtSMC = new Date(smc_action_date?.value).toDateString();
//   } else {
//     applicationAtSMC = '';
//   }
//   let applicationAtNMC;
//   if (nmc_action_date?.value) {
//     applicationAtNMC = new Date(nmc_action_date?.value).toDateString();
//   } else {
//     applicationAtNMC = '';
//   }

//   let finalCollegeDate;
//   if (college_dean_action_date?.value) {
//     finalCollegeDate = new Date(college_dean_action_date?.value).toDateString();
//   }
//   if (college_registrar_action_date?.value) {
//     finalCollegeDate = new Date(college_registrar_action_date?.value).toDateString();
//   }
//   if (college_dean_action_date?.value && college_registrar_action_date?.value) {
//     finalCollegeDate = new Date(college_dean_action_date?.value).toDateString();
//   }

//   return (
//     <Box sx={{ maxWidth: 400 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
//               optional={
//                 index === 2 ? (
//                   <Typography variant="caption">Last step</Typography>
//                 ) : null
//               }
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//               <Typography>{step.description}</Typography>
//               <Box sx={{ mb: 2 }}>
//                 <div>
//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                   </Button>
//                   <Button
//                     disabled={index === 0}
//                     onClick={handleBack}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     Back
//                   </Button>
//                 </div>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you&apos;re finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )}
//     </Box>
//   );
// }
