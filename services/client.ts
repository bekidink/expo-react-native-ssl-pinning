export const ENDPOINTS = {
  AccountList: "/Closed/AccountListCCY/rest/accountList",
  AccountStatement: "/Closed/SingleAccountDetail/rest/balance",
  AccountBalance: "/Closed/BalanceInquery/rest/balance",
  BankList: "/Closed/BankList/rest/banklist",
  ExternalAccountInfo: "/Closed/otherBankAccountInfo/rest/otherBankAccountInfo",
  ExternalFundTransfer:
    "/Closed/BeneficiaryFundTransferExternal/rest/beneficiaryFundTransferExternal",
  InternalAccountInfo: "/Closed/InternalAccountInfo/rest/internal",
  InternalFundTransfer:
    "/Closed/InternalFundTransfer/rest/internalFundTransfer",
  MiniStatement: "/Closed/MiniStatement/rest/miniStatement",
  WalletAccountDetail: "/Closed/WalletAccountDetail/rest/walletAccountDetail",
  WalletTransfer: "/Closed/WalletTransfer/rest/walletTransfer",
  TeleBirr: "/Closed/telebirrOutTransfer/rest/teleBirr",
  TopUp: "/Closed/TopUp/rest/topup",
  Activation: "/Begin",
  Login: "/Authorize",
  RefreshToken: "/refresh_token",
  GetPhone: "/appBackOffice/rest/hijraApp/getPhone",
  ChangePin: "/Closed/changePin",
  VersionCheck: "/VersionCheck/rest/checkVersion",
  DonationsList: "/Closed/Donation/rest/donationList",
  EthiopianArilinesInfo: "/Closed/FlygateInfo/rest/flygate",
  EthiopianArilinesPayment: "/Closed/FlygatePayment/rest/flygatePayment",
  SchoolInfo: "/Closed/StudentInfo/rest/studentinfo",
  SchoolPayment: "/Closed/SchoolPayTransferIn/rest/SchoolPayTransfer",
  AwachInfo: "/Closed/AwachInfo/rest/awach",
  AwachPayment: "/Closed/AwachTransfer/rest/awach",
  QrExtract: "/Closed/QRPayment/rest/Extract",
  QrPayment: "/Closed/QRPayment/rest/IpsPayment",
};

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
