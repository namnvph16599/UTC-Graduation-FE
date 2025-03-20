export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthEntity = {
  __typename?: 'AuthEntity';
  accessToken: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deviceId?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  refreshToken: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
};

export type CheckOtpInput = {
  id: Scalars['String'];
  meta?: InputMaybe<MetaInput>;
  method: OtpMethod;
  otpCode: Scalars['String'];
  type: OtpType;
};

export type CommonEntity = {
  __typename?: 'CommonEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type CreateOtpInput = {
  email?: InputMaybe<Scalars['String']>;
  method: OtpMethod;
  phone?: InputMaybe<Scalars['String']>;
  phonePrefix?: InputMaybe<Scalars['String']>;
};

export type CreateOtpVerifyEmailOrPhone = {
  email?: InputMaybe<Scalars['String']>;
  otpMethod: OtpMethod;
  phone?: InputMaybe<Scalars['String']>;
  phonePrefix?: InputMaybe<Scalars['String']>;
  type: OtpType;
};

export type GroupEntity = {
  __typename?: 'GroupEntity';
  avatar?: Maybe<MediaEntity>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  status: GroupStatus;
  updatedAt: Scalars['DateTime'];
};

export enum GroupRole {
  MEMBER = 'Member',
  OWNER = 'Owner',
}

export enum GroupStatus {
  ACTIVE = 'Active',
  DISABLE = 'Disable',
}

export type GroupUserEntity = {
  __typename?: 'GroupUserEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  group: GroupEntity;
  id: Scalars['ID'];
  role: GroupRole;
  status: GroupUserStatus;
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
};

export enum GroupUserStatus {
  ACCEPT = 'Accept',
  DISABLE = 'Disable',
  INVITED = 'Invited',
}

export type LoginByPhoneInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  phonePrefix: Scalars['String'];
  platform?: Platform;
};

export type MediaEntity = {
  __typename?: 'MediaEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fullUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type: MediaType;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export enum MediaType {
  AUDIO = 'Audio',
  IMAGE = 'Image',
  OTHER = 'Other',
  VIDEO = 'Video',
}

export type MetaInput = {
  value?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLoginByPhone: AuthEntity;
  changeUserEmailOrPhone: UserEntity;
  loginByPhone: AuthEntity;
  logout: Scalars['Boolean'];
  refreshToken: AuthEntity;
  registerByPhone: UserEntity;
  removeMedias: Scalars['Boolean'];
  removeNotifications: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  removeUserByAdmin: Scalars['Boolean'];
  seenNotifications: Scalars['Boolean'];
  sendForgotPasswordOtp?: Maybe<Scalars['String']>;
  sendOtpVerifyEmailOrPhone?: Maybe<Scalars['String']>;
  sendRegisterOtp?: Maybe<Scalars['String']>;
  updateUserAvatar: UserEntity;
  updateUserInformation: UserEntity;
  updateUserPassword: UserEntity;
  updateUsername: UserEntity;
  userChangePassword: UserEntity;
  verifyOtpRegisterAccountByPhone: Scalars['Boolean'];
};

export type MutationAdminLoginByPhoneArgs = {
  input: LoginByPhoneInput;
};

export type MutationChangeUserEmailOrPhoneArgs = {
  input: UpdateUserNewEmailOrPhoneInput;
};

export type MutationLoginByPhoneArgs = {
  input: LoginByPhoneInput;
};

export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};

export type MutationRegisterByPhoneArgs = {
  input: RegisterByPhoneInput;
};

export type MutationRemoveMediasArgs = {
  input: RemoveMediasInput;
};

export type MutationRemoveNotificationsArgs = {
  input: RemoveNotificationInput;
};

export type MutationRemoveUserArgs = {
  password: Scalars['String'];
};

export type MutationRemoveUserByAdminArgs = {
  userId: Scalars['String'];
};

export type MutationSeenNotificationsArgs = {
  input: SeenNotificationsInput;
};

export type MutationSendForgotPasswordOtpArgs = {
  input: CreateOtpInput;
};

export type MutationSendOtpVerifyEmailOrPhoneArgs = {
  input: CreateOtpVerifyEmailOrPhone;
};

export type MutationSendRegisterOtpArgs = {
  input: CreateOtpInput;
};

export type MutationUpdateUserAvatarArgs = {
  mediaId: Scalars['String'];
};

export type MutationUpdateUserInformationArgs = {
  input: UpdateUserInformationInput;
};

export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};

export type MutationUpdateUsernameArgs = {
  username: Scalars['String'];
};

export type MutationUserChangePasswordArgs = {
  input: UserChangePasswordInput;
};

export type MutationVerifyOtpRegisterAccountByPhoneArgs = {
  input: VerifyOtpRegisterAccountByPhoneInput;
};

export type NotificationCollectionFilter = {
  isSeen: Scalars['Boolean'];
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  attribute?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['DateTime'];
  creator: UserEntity;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  topic: NotificationTopic;
  updatedAt: Scalars['DateTime'];
};

export enum NotificationTopic {
  ADDUSERTOGROUP = 'AddUserToGroup',
  COMMENTTOTASK = 'CommentToTask',
  DUETASK = 'DueTask',
  INVITEUSERTOTASK = 'InviteUserToTask',
  MARKTASKASCOMPLETED = 'MarkTaskAsCompleted',
  MARKTASKCHECKLISTASCOMPLETED = 'MarkTaskCheckListAsCompleted',
  OTHER = 'Other',
  REMINDTASK = 'RemindTask',
  REMINDINGTASKISBEINGEXPIRED = 'RemindingTaskIsBeingExpired',
  RENEWSUBSCRIPTIONFORACCOUNT = 'RenewSubscriptionForAccount',
  TAGTOTASK = 'TagToTask',
  UPGRADESUBSCRIPTIONFORACCOUNT = 'UpgradeSubscriptionForAccount',
  USERACCEPTTOGROUP = 'UserAcceptToGroup',
  USERACCEPTTOTASK = 'UserAcceptToTask',
}

export type NotificationUserConnection = {
  __typename?: 'NotificationUserConnection';
  items: Array<NotificationUserEntity>;
  meta: PageMeta;
};

export type NotificationUserEntity = {
  __typename?: 'NotificationUserEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isSeen: Scalars['Boolean'];
  notification: NotificationEntity;
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
};

export enum OtpMethod {
  EMAIL = 'Email',
  PHONENUMBER = 'PhoneNumber',
}

export enum OtpType {
  FORGOTPASSWORD = 'ForgotPassword',
  OTHER = 'Other',
  REGISTER = 'Register',
  VERIFYEMAILORPHONE = 'VerifyEmailOrPhone',
  VERIFYNEWEMAILORPHONE = 'VerifyNewEmailOrPhone',
}

export type PageCursorInfo = {
  __typename?: 'PageCursorInfo';
  endCursor?: Maybe<Scalars['String']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type PageMeta = {
  __typename?: 'PageMeta';
  currentPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  limit: Scalars['Int'];
  totalItem: Scalars['Int'];
  totalPage: Scalars['Int'];
};

export type PaginationArgs = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};

export type PermissionEntity = {
  __typename?: 'PermissionEntity';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  roles: Array<RoleEntity>;
  updatedAt: Scalars['DateTime'];
};

export enum Platform {
  MOBILE = 'Mobile',
  WEB = 'Web',
}

export type Query = {
  __typename?: 'Query';
  checkOtp: Scalars['Boolean'];
  getUserByAdmin: UserEntity;
  getUserById: UserEntity;
  me?: Maybe<UserEntity>;
  meAdmin?: Maybe<UserEntity>;
  media: MediaEntity;
  notificationCollection: NotificationUserConnection;
  sample: Array<SampleEntity>;
  sayHello: Scalars['String'];
  userCollection: UserConnection;
  userCollectionByAdmin: UserConnection;
};

export type QueryCheckOtpArgs = {
  input: CheckOtpInput;
};

export type QueryGetUserByAdminArgs = {
  userId: Scalars['String'];
};

export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};

export type QueryMediaArgs = {
  id: Scalars['String'];
};

export type QueryNotificationCollectionArgs = {
  filter?: InputMaybe<NotificationCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QuerySampleArgs = {
  id: Scalars['String'];
};

export type QueryUserCollectionArgs = {
  input?: InputMaybe<UserCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryUserCollectionByAdminArgs = {
  filter?: InputMaybe<UserCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type RegisterByPhoneInput = {
  otp?: InputMaybe<CheckOtpInput>;
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  phone: Scalars['String'];
  phonePrefix: Scalars['String'];
};

export type RemoveMediasInput = {
  ids: Array<Scalars['String']>;
};

export type RemoveNotificationInput = {
  notificationUserIds: Array<Scalars['String']>;
};

export type RoleEntity = {
  __typename?: 'RoleEntity';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<PermissionEntity>;
  updatedAt: Scalars['DateTime'];
};

export type SampleEntity = {
  __typename?: 'SampleEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type SeenNotificationsInput = {
  ids: Array<Scalars['String']>;
};

export enum StoreProvider {
  ADMIN = 'Admin',
  APPLE = 'Apple',
  FREETRIAL = 'FreeTrial',
  GOOGLE = 'Google',
  VOUCHER = 'Voucher',
}

export type SubscriptionEntity = {
  __typename?: 'SubscriptionEntity';
  appleProductId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  googleProductId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SubscriptionOrderEntity = {
  __typename?: 'SubscriptionOrderEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  orderId: Scalars['String'];
  price: Scalars['Float'];
  purchaseDate: Scalars['DateTime'];
  storeProvider: StoreProvider;
  subscriptionUser: SubscriptionUserEntity;
  token?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export enum SubscriptionType {
  FREE = 'Free',
  PREMIUM = 'Premium',
}

export type SubscriptionUserEntity = {
  __typename?: 'SubscriptionUserEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  expiredDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  subscription?: Maybe<SubscriptionEntity>;
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
};

export type TaskCheckListEntity = {
  __typename?: 'TaskCheckListEntity';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  task: TaskEntity;
  updatedAt: Scalars['DateTime'];
};

export type TaskCommentEntity = {
  __typename?: 'TaskCommentEntity';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: UserEntity;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  task: TaskEntity;
  updatedAt: Scalars['DateTime'];
};

export type TaskEntity = {
  __typename?: 'TaskEntity';
  checkList: Array<TaskCheckListEntity>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: UserEntity;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  priority: TaskPriority;
  progressStatus: TaskProgressStatus;
  remindedAfter?: Maybe<Scalars['Int']>;
  remindedAt?: Maybe<Scalars['DateTime']>;
  remindedDates?: Maybe<Array<Scalars['DateTime']>>;
  remindedDays?: Maybe<Array<Scalars['Int']>>;
  remindedEndAfterCount?: Maybe<Scalars['Int']>;
  remindedEndAt?: Maybe<Scalars['DateTime']>;
  remindedOverDueAt?: Maybe<Scalars['DateTime']>;
  remindedOverDueType?: Maybe<TaskRemindedOverDueType>;
  remindedType?: Maybe<TaskRemindType>;
  reminderRepeatType?: Maybe<TaskReminderRepeatType>;
  scheduleDate?: Maybe<Scalars['DateTime']>;
  status: TaskStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaskEntityEdge = {
  __typename?: 'TaskEntityEdge';
  cursor: Scalars['String'];
  node: TaskEntity;
};

export enum TaskPriority {
  HIGH = 'High',
  LOW = 'Low',
  LOWEST = 'Lowest',
  MEDIUM = 'Medium',
}

export enum TaskProgressStatus {
  DONE = 'Done',
  INPROGRESS = 'InProgress',
}

export enum TaskRemindType {
  CUSTOM = 'Custom',
  DAY = 'Day',
  DEFAULT = 'Default',
  MONTH = 'Month',
  WEEK = 'Week',
}

export enum TaskRemindedOverDueType {
  DAY = 'Day',
  DEFAULT = 'Default',
  WEEK = 'Week',
}

export enum TaskReminderRepeatType {
  CUSTOM = 'Custom',
  DAILY = 'Daily',
  MONTHLY = 'Monthly',
  WEEKDAY = 'Weekday',
  WEEKLY = 'Weekly',
}

export enum TaskStatus {
  ACTIVE = 'Active',
  ARCHIVED = 'Archived',
}

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateUserNewEmailOrPhoneInput = {
  emailNew?: InputMaybe<Scalars['String']>;
  otp: CheckOtpInput;
  otpMethod: OtpMethod;
  otpNew: CheckOtpInput;
  phoneNew?: InputMaybe<Scalars['String']>;
  phonePrefixNew?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPasswordInput = {
  email?: InputMaybe<Scalars['String']>;
  otp: CheckOtpInput;
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  phonePrefix?: InputMaybe<Scalars['String']>;
};

export type UserChangePasswordInput = {
  passwordConfirm: Scalars['String'];
  passwordNew: Scalars['String'];
  passwordOld: Scalars['String'];
};

export type UserCollectionFilter = {
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  /** search user by name or phone or username */
  query?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<UserStatus>>;
  subscriptionId?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<SubscriptionType>;
  type?: InputMaybe<UserType>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  items: Array<UserEntity>;
  meta: PageMeta;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  avatar?: Maybe<MediaEntity>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['String']>;
  phonePrefix?: Maybe<Scalars['String']>;
  status?: Maybe<UserStatus>;
  type: UserType;
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  VERIFYNEEDED = 'VerifyNeeded',
}

export enum UserType {
  ADMIN = 'Admin',
  USER = 'User',
}

export type VerifyOtpRegisterAccountByPhoneInput = {
  otpCode: Scalars['String'];
  userId: Scalars['String'];
};

export type VoucherEntity = {
  __typename?: 'VoucherEntity';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  expiredDate: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  providerType: VoucherProviderType;
  quantity: Scalars['Int'];
  startDate: Scalars['DateTime'];
  status: Scalars['Boolean'];
  subscription: SubscriptionEntity;
  updatedAt: Scalars['DateTime'];
};

export enum VoucherProviderType {
  ADMIN = 'Admin',
  MBBANK = 'MbBank',
}

export type VoucherUserEntity = {
  __typename?: 'VoucherUserEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  voucher: VoucherEntity;
};
