export const intentConsts = {
  SPECIAL_OFFERS: 'а7) Покажи ми специалните оферти',
  // WELCOME_INITIAL: 'a0) Default Welcome Intent - Initial',
  DEFAULT_WELCOME_WISMO: 'a0) Default Welcome Intent - Initial - custom - WISMO Selected',
  // ORDER_LOOKUP_HWAR_RETRY_ORDER_NO: 'a1.1) I need help with a return - Retry Order No',
  // ORDER_LOOKUP_HDIR_RETRY_ORDER_NO: 'a2.1) How do I return - Retry Order No',
  // ORDER_LOOKUP_WIMR_RETRY_ORDER_NO: 'a3.1) Where is my Refund - Retry Order No',
  // ORDER_LOOKUP_MRII_RETRY_ORDER_NO: 'a4.1) My Refund Is Incorrect - Retry Order No',
  // ORDER_LOOKUP_ILMR_RETRY_ORDER_NO: 'a5.1) Issues logging my return - Retry Order No',
  // ORDER_LOOKUP_WISMO_RETRY_ORDER_NO: 'a6.1) WISMO - Retry Order No',
  // ORDER_LOOKUP_RC_RETRY_ORDER_NO: 'a7.1) Return Charges - Retry Order No',
  // HWAR_RETRY_ORDER_NO: 'a1) I need help with a return - Retry Order No',
  // HDIR_RETRY_ORDER_NO: 'a2) How do I return - Retry Order No',
  // WIMR_RETRY_ORDER_NO: 'a3) Where is my Refund - Retry Order No',
  // MRII_RETRY_RETRY_NO: 'a4) My Refund Is Incorrect - Retry Order No',
  // ILMR_RETRY_ORDER_NO: 'a5) Issues logging my return - Retry Order No',
  // WISMO_RETRY_ORDER_NO: 'a6) WISMO - Retry Order No',
  // RC_RETRY_ORDER_NO: 'a7) Return Charges - Retry Order No',
  // HWAR_RETRY_EMAIL: 'a1) I need help with a return - Retry Email',
  // WIMR_RETRY_EMAIL: 'a3) Where is my Refund - Retry Email',
  // HDIR_RETRY_EMAIL: 'a2) How do I return - Retry Email',
  // MRII_RETRY_EMAIL: 'a4) My Refund Is Incorrect - Retry Email',
  // ILMR_RETRY_EMAIL: 'a5) Issues logging my return - Retry Email',
  // RC_RETRY_EMAIL: 'a7) Return Charges - Retry Email',
  // WISMO_RETRY_EMAIL: 'a6) WISMO - Retry Email',
  // ORDER_LOOKUP_HWAR_RETRY_EMAIL: 'a1.1) I need help with a return - Retry Email',
  // ORDER_LOOKUP_HDIR_RETRY_EMAIL: 'a2.1) How do I return - Retry Email',
  // ORDER_LOOKUP_WIMR_RETRY_EMAIL: 'a3.1) Where is my Refund - Retry Email',
  // ORDER_LOOKUP_MRII_RETRY_EMAIL: 'a4.1) My Refund Is Incorrect - Retry Email',
  // ORDER_LOOKUP_ILMR_RETRY_EMAIL: 'a5.1) Issues logging my return - Retry Email',
  // ORDER_LOOKUP_WISMO_RETRY_EMAIL: 'a6.1) WISMO - Retry Email',
  // ORDER_LOOKUP_RC_RETRY_EMAIL: 'a7.1) Return Charges - Retry Email',
  // ORDER_LOOKUP_ORDER: 'Store order no and Lookup Order',
  // ORDER_LOOKUP_ORDER_NO_CONFIRM: 'b1.1) Find Order - Order No',
  // ORDER_LOOKUP_EMAIL_CONFIRM: 'b2.1) Find Order - Email and Lookup order',
  // ORDER_LOOKUP_EMAIL: 'Store email and Lookup Orders',
  // ORDER_LOOKUP_ORDER_NO: 'Capture order number and redirect with event',
  // ORDER_LOOKUP_ORDER_NO_FROM_2_ORDERS: '6.1.1) Capture order number and redirect with event',
  // ORDER_LOOKUP_ORDER_NO_FROM_1_ORDERS: 'b6.2.1) Capture order number and redirect with event',
  // HWAR: 'c1) Help with a Return',
  // HWAR_INITIAL: 'a1) I need help with a return - Initial',
  // ILMR_INITIAL: 'a5) Issues logging my return - Initial',
  // FIND_ORDER_RETRY_EMAIL: 'b2.2) Find order - Retry Email - custom',
  // HWARtoILMR: 'c1) Help with a Return - Status Other - no - timeframepassed - yes - Issues logging my return',
  // HWAR_TO_RC_NOT_RETURNED: 'c1) Help with a Return - Status Other - no - timeframepassed - yes - Return charges',
  // HWAR_TO_RC_RETURNED: 'c1) Help with a Return - Status Returned - no - Return charges',
  // HDIRtoRC: 'c2) How do I return - Returned - no - Return charges',
  // HDIR: 'c2) How do I return',
  // HDIR_INITIAL: 'a2) How do I return - Initial',
  // WIMR: 'c3) Where is my refund',
  // WIMR_INITIAL: 'a3) Where is my Refund - Initial',
  // CHECK_ORDER_EDD: 'c6) WISMO',
  // INCORRECT_REFUND: 'c4) My refund is incorrect',
  // HWARtoHDIR: 'c1) Help with a Return - Status Other - no - timeframepassed - yes - How do I return',
  // HDIRtoWIMR: 'c2) How do I return - Returned - no - Where is my refund',
  // WIMRtoDefault: 'c3) Where is my refund - Status Returned - yes - Back to Start',
  // WIMRtoStart: 'c3) WIMR - Other - Check Date - Inside - no - yes - Back to Start',
  // WIMRcheckDate: 'c3) Where is my refund - Status Other - Check Date',
  // MRII: 'c4) My refund is incorrect',
  // MRII_INITIAL: 'a4) My Refund Is Incorrect - Initial',
  // MRIItoDefault: 'c4) My refund is incorrect - Status Returned - Inside - no - yes - Back to Start',
  // MRIItoStart: 'c4) My refund is incorrect - Status Other - yes - yes - Back to Start',
  // ILMR_NRMD: 'c5) Not recognising my details',
  // HDIRtoMRII: 'c2) How do I return - Returned - no - My Refund is incorrect',
  // HWARtoMRII: 'c1) Help with a Return - Status Returned - no - MRII',
  // HWARtoWIMR: 'c1) Help with a Return - Status Returned - no - WIMR',
  // RC_FEE_TO_RETURN: 'c7) Return charges - I\'ve been charged a fee to return',
  // RC_COST_TO_RETURN: 'c7) Return charges - Is there a cost to return',
  // WISMO: 'c6) WISMO',
  // WISMO_INITIAL: 'a6) WISMO - Initial',
  // WRONG_ORDER: 'b7) Wrong order',
  // RC_INTIAL: 'a7) Return Charges - Initial',
  WELCOME_INITIAL_FAQ: 'a0) Default Welcome Intent - Initial - custom'
  // RC_COST_TO_RETURN_DEB_OR_PLT_YES_TO_START: 'c7) Return charges - Is there a cost to return - Deb or PLT - yes - Pick - BacktoStart',
  // RC_COST_TO_RETURN_DEB_OR_PLT_NO_TO_START: 'c7) Return charges - Is there a cost to return - Deb or PLT - no - Pick - BacktoStart',
  // RC_COST_TO_RETURN_DEB_OR_PLT_NO_TO_START_EU: 'c7) Return charges - Is there a cost to return - Deb or PLT - no (EU) - Pick - BacktoStart',
  // RC_FEE_TO_RETURN_DEB_OR_PLT_NO_TO_START: 'c7) Return charges - I\'ve been charged a fee to return - Deb or PLT-no-Pick an option-BacktoStart',
  // RC_FEE_TO_RETURN_DEB_OR_PLT_NO_TO_START_EU: 'c7) Return charges - I\'ve been charged a fee to return - Deb or PLT - no (EU) - Pick - BacktoStart'
  // to check yes
}

export const eventsContextMap = {
  WELCOME: 'a0defaultwelcomeintent-initial-followup',
  HWAR: 'helpwithareturn',
  HDIR: 'howdoireturn',
  WIMR: 'whereismyrefund',
  MRII: 'myrefundisincorrect',
  ILMR: 'issuesloggingmyreturn',
  WISMO: 'wismo',
  RC: 'returncharges'
}
