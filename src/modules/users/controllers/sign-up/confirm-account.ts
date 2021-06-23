// const { confirmAccount } = require('../use-cases/create-user');
// const { isAccountConfirmedInfo } = require('../use-cases/create-user');

// export const checkAccountConfirmation = async (req, res, next) => {
//   const { confirmationCode } = req.params;

//   if (!confirmationCode) {
//     res.render('sign-up-confirmation-error', {
//       title: 'Error de confirmación',
//     });
//     return;
//   }

//   try {
//     const result = await confirmAccount(confirmationCode);

//     if (!isAccountConfirmedInfo(result)) {
//       throw result; // Is an error
//     }

//     const { wasAlreadyActive, user } = result;
//     renderConfirmationSuccess(res, {
//       name: user.firstName,
//       isConfirmedAlready: wasAlreadyActive,
//     });
//   } catch (err) {
//     renderConfirmationError(res);
//     next(err);
//   }
// };

// function renderConfirmationSuccess(res, data) {
//   res.render('sign-up-confirmation-success', {
//     title: '¡Felicidades!',
//     name: data.name || 'No name provided',
//     isConfirmedAlready: data.isConfirmedAlready || false,
//   });
// }

// function renderConfirmationError(res) {
//   res.render('sign-up-confirmation-error', {
//     title: 'Error',
//   });
// }
