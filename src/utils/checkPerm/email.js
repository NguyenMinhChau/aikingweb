const EMAIL_BY_PASS = ['@gmail.com'];

export const emailPerm = email => {
  if (email) {
    const emailSplit = email.split('@');
    if (emailSplit.length > 1) {
      const emailDomain = emailSplit[emailSplit.length - 1];
      if (EMAIL_BY_PASS.includes(`@${emailDomain}`)) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
};
