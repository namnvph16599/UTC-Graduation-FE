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

export type BrandConnection = {
  __typename?: 'BrandConnection';
  items: Array<BrandEntity>;
  meta: PageMeta;
};

export type BrandEntity = {
  __typename?: 'BrandEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  models?: Maybe<Array<ModelEntity>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CancelRepairInput = {
  cancelled_description: Scalars['String'];
  id: Scalars['String'];
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

export type ContactCollectionInput = {
  status?: InputMaybe<ContactStatusEnum>;
};

export type ContactConnection = {
  __typename?: 'ContactConnection';
  items: Array<ContactEntity>;
  meta: PageMeta;
};

export type ContactEntity = {
  __typename?: 'ContactEntity';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  note: Scalars['String'];
  phone: Scalars['String'];
  status: ContactStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export enum ContactStatusEnum {
  CANCELLED = 'Cancelled',
  DEFAULT = 'Default',
  HANDLED = 'Handled',
}

export type CountRepairByStatus = {
  __typename?: 'CountRepairByStatus';
  status: RepairStatusEnum;
  total: Scalars['Float'];
};

export type CreateBrandInput = {
  model_names: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateContactInput = {
  content: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  status: ContactStatusEnum;
};

export type CreateMotorcycleInput = {
  capacity: Scalars['Float'];
  license_plate: Scalars['String'];
  manufacture_year: Scalars['String'];
  model_id: Scalars['String'];
  name: Scalars['String'];
  user_id: Scalars['String'];
};

export type CreateNewsInput = {
  content: Scalars['String'];
  description: Scalars['String'];
  image_url: Scalars['String'];
  title: Scalars['String'];
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

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type CreateRepairInput = {
  capacity: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  description_of_customer?: InputMaybe<Scalars['String']>;
  discount_percent?: InputMaybe<Scalars['Float']>;
  estimated_delivery_time?: InputMaybe<Scalars['DateTime']>;
  expected_receiving_time?: InputMaybe<Scalars['DateTime']>;
  license_plate: Scalars['String'];
  manufacture_year: Scalars['String'];
  model_id: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  products?: InputMaybe<Array<ProductInput>>;
  service_ids?: InputMaybe<Array<Scalars['String']>>;
  staff_id?: InputMaybe<Scalars['String']>;
  status: RepairStatusEnum;
  vehicle_id?: InputMaybe<Scalars['String']>;
};

export type CreateServiceInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type CreateUserByAdminInput = {
  email?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  phonePrefix: Scalars['String'];
  status?: InputMaybe<UserStatus>;
};

export type ExportRepairsInput = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type GetModelsRequest = {
  brand_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

export type ModelEntity = {
  __typename?: 'ModelEntity';
  brand?: Maybe<BrandEntity>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ModelOfUpdateBrandInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type MotorcycleCollectionFilter = {
  user_id?: InputMaybe<Scalars['String']>;
};

export type MotorcycleConnection = {
  __typename?: 'MotorcycleConnection';
  items: Array<MotorcycleEntity>;
  meta: PageMeta;
};

export type MotorcycleEntity = {
  __typename?: 'MotorcycleEntity';
  capacity: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  license_plate: Scalars['String'];
  manufacture_year: Scalars['String'];
  model?: Maybe<ModelEntity>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLoginByPhone: AuthEntity;
  cancelRepair: RepairEntity;
  changeUserEmailOrPhone: UserEntity;
  createBrand: BrandEntity;
  createContact: ContactEntity;
  createMotorcycle: MotorcycleEntity;
  createNews: NewsEntity;
  createProduct: ProductEntity;
  createRepairRequest: RepairEntity;
  createService: ServicesEntity;
  createUserByAdmin: UserEntity;
  loginByPhone: AuthEntity;
  logout: Scalars['Boolean'];
  refreshToken: AuthEntity;
  registerByPhone: UserEntity;
  removeBrand: Scalars['Boolean'];
  removeContact: Scalars['Boolean'];
  removeMedias: Scalars['Boolean'];
  removeMotorcycle: Scalars['Boolean'];
  removeNews: Scalars['Boolean'];
  removeNotifications: Scalars['Boolean'];
  removeProduct: Scalars['Boolean'];
  removeService: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  removeUserByAdmin: Scalars['Boolean'];
  seenNotifications: Scalars['Boolean'];
  sendForgotPasswordOtp?: Maybe<Scalars['String']>;
  sendOtpVerifyEmailOrPhone?: Maybe<Scalars['String']>;
  sendRegisterOtp?: Maybe<Scalars['String']>;
  updateBrand: BrandEntity;
  updateContact: ContactEntity;
  updateMotorcycle: MotorcycleEntity;
  updateNews: NewsEntity;
  updateProduct: ProductEntity;
  updateRepairRequest: RepairEntity;
  updateService: ServicesEntity;
  updateUserAvatar: UserEntity;
  updateUserByAdmin: UserEntity;
  updateUserInformation: UserEntity;
  updateUserPassword: UserEntity;
  updateUsername: UserEntity;
  userChangePassword: UserEntity;
  verifyOtpRegisterAccountByPhone: Scalars['Boolean'];
};

export type MutationAdminLoginByPhoneArgs = {
  input: LoginByPhoneInput;
};

export type MutationCancelRepairArgs = {
  input: CancelRepairInput;
};

export type MutationChangeUserEmailOrPhoneArgs = {
  input: UpdateUserNewEmailOrPhoneInput;
};

export type MutationCreateBrandArgs = {
  args: CreateBrandInput;
};

export type MutationCreateContactArgs = {
  input: CreateContactInput;
};

export type MutationCreateMotorcycleArgs = {
  input: CreateMotorcycleInput;
};

export type MutationCreateNewsArgs = {
  input: CreateNewsInput;
};

export type MutationCreateProductArgs = {
  args: CreateProductInput;
};

export type MutationCreateRepairRequestArgs = {
  input: CreateRepairInput;
};

export type MutationCreateServiceArgs = {
  args: CreateServiceInput;
};

export type MutationCreateUserByAdminArgs = {
  input: CreateUserByAdminInput;
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

export type MutationRemoveBrandArgs = {
  id: Scalars['String'];
};

export type MutationRemoveContactArgs = {
  id: Scalars['String'];
};

export type MutationRemoveMediasArgs = {
  input: RemoveMediasInput;
};

export type MutationRemoveMotorcycleArgs = {
  id: Scalars['String'];
};

export type MutationRemoveNewsArgs = {
  id: Scalars['String'];
};

export type MutationRemoveNotificationsArgs = {
  input: RemoveNotificationInput;
};

export type MutationRemoveProductArgs = {
  id: Scalars['String'];
};

export type MutationRemoveServiceArgs = {
  id: Scalars['String'];
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

export type MutationUpdateBrandArgs = {
  args: UpdateBrandInput;
};

export type MutationUpdateContactArgs = {
  input: UpdateContactInput;
};

export type MutationUpdateMotorcycleArgs = {
  input: UpdateMotorcycleInput;
};

export type MutationUpdateNewsArgs = {
  input: UpdateNewsInput;
};

export type MutationUpdateProductArgs = {
  args: UpdateProductInput;
};

export type MutationUpdateRepairRequestArgs = {
  input: UpdateRepairInput;
};

export type MutationUpdateServiceArgs = {
  args: UpdateServiceInput;
};

export type MutationUpdateUserAvatarArgs = {
  mediaId: Scalars['String'];
};

export type MutationUpdateUserByAdminArgs = {
  input: UpdateUserByAdminInput;
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

export type NewsConnection = {
  __typename?: 'NewsConnection';
  items: Array<NewsEntity>;
  meta: PageMeta;
};

export type NewsEntity = {
  __typename?: 'NewsEntity';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  image_url: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  search?: InputMaybe<Scalars['String']>;
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

export type ProductConnection = {
  __typename?: 'ProductConnection';
  items: Array<ProductEntity>;
  meta: PageMeta;
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ProductInput = {
  id: Scalars['String'];
  quantity: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  brand: BrandEntity;
  brandCollection: BrandConnection;
  checkOtp: Scalars['Boolean'];
  contact: ContactEntity;
  contactCollection: ContactConnection;
  countRepairsByStatuses: Array<CountRepairByStatus>;
  exportRepairs: Scalars['String'];
  getStaffByAdmin: UserEntity;
  getUserById: UserEntity;
  me?: Maybe<UserEntity>;
  meAdmin?: Maybe<UserEntity>;
  media: MediaEntity;
  models: Array<ModelEntity>;
  motorcycle: MotorcycleEntity;
  motorcycleCollection: MotorcycleConnection;
  news: NewsEntity;
  newsCollection: NewsConnection;
  notificationCollection: NotificationUserConnection;
  product: ProductEntity;
  productCollection: ProductConnection;
  products: Array<ProductEntity>;
  repair: RepairEntity;
  repairCollection: RepairConnection;
  revenueRepair: Array<RevenueRepair>;
  sample: Array<SampleEntity>;
  sayHello: Scalars['String'];
  service: ServicesEntity;
  serviceCollection: ServiceConnection;
  services: Array<ServicesEntity>;
  userCollection: UserConnection;
  userCollectionByAdmin: UserConnection;
};

export type QueryBrandArgs = {
  id: Scalars['String'];
};

export type QueryBrandCollectionArgs = {
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryCheckOtpArgs = {
  input: CheckOtpInput;
};

export type QueryContactArgs = {
  id: Scalars['String'];
};

export type QueryContactCollectionArgs = {
  filterArgs?: InputMaybe<ContactCollectionInput>;
  paginationArgs: PaginationArgs;
};

export type QueryExportRepairsArgs = {
  input: ExportRepairsInput;
};

export type QueryGetStaffByAdminArgs = {
  staffId: Scalars['String'];
};

export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};

export type QueryMediaArgs = {
  id: Scalars['String'];
};

export type QueryModelsArgs = {
  args?: InputMaybe<GetModelsRequest>;
};

export type QueryMotorcycleArgs = {
  id: Scalars['String'];
};

export type QueryMotorcycleCollectionArgs = {
  filterArgs?: InputMaybe<MotorcycleCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryNewsArgs = {
  id: Scalars['String'];
};

export type QueryNewsCollectionArgs = {
  paginationArgs: PaginationArgs;
};

export type QueryNotificationCollectionArgs = {
  filter?: InputMaybe<NotificationCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryProductArgs = {
  id: Scalars['String'];
};

export type QueryProductCollectionArgs = {
  paginationArgs?: InputMaybe<PaginationArgs>;
};

export type QueryRepairArgs = {
  id: Scalars['String'];
};

export type QueryRepairCollectionArgs = {
  input?: InputMaybe<RepairCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryRevenueRepairArgs = {
  input: RevenueRepairInput;
};

export type QuerySampleArgs = {
  id: Scalars['String'];
};

export type QueryServiceArgs = {
  id: Scalars['String'];
};

export type QueryServiceCollectionArgs = {
  paginationArgs?: InputMaybe<PaginationArgs>;
};

export type QueryUserCollectionArgs = {
  input?: InputMaybe<UserCollectionFilter>;
  pagination?: InputMaybe<PaginationArgs>;
};

export type QueryUserCollectionByAdminArgs = {
  filterArgs?: InputMaybe<UserCollectionFilter>;
  paginationArgs?: InputMaybe<PaginationArgs>;
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

export type RepairCollectionFilter = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<RepairStatusEnum>;
  userId?: InputMaybe<Scalars['String']>;
};

export type RepairConnection = {
  __typename?: 'RepairConnection';
  items: Array<RepairEntity>;
  meta: PageMeta;
};

export type RepairEntity = {
  __typename?: 'RepairEntity';
  cancelled_description?: Maybe<Scalars['String']>;
  capacity: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  description_of_customer?: Maybe<Scalars['String']>;
  discount_percent?: Maybe<Scalars['Float']>;
  estimated_delivery_time?: Maybe<Scalars['DateTime']>;
  expected_receiving_time?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  license_plate: Scalars['String'];
  manufacture_year: Scalars['String'];
  model?: Maybe<ModelEntity>;
  motorcycle?: Maybe<MotorcycleEntity>;
  name: Scalars['String'];
  phone: Scalars['String'];
  products: Array<RepairM2MProductEntity>;
  services: Array<RepairM2MServiceEntity>;
  staff?: Maybe<UserEntity>;
  status: RepairStatusEnum;
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<UserEntity>;
};

export type RepairM2MProductEntity = {
  __typename?: 'RepairM2MProductEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  product: ProductEntity;
  quantity: Scalars['Float'];
  repair: RepairEntity;
  updatedAt: Scalars['DateTime'];
};

export type RepairM2MServiceEntity = {
  __typename?: 'RepairM2MServiceEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  repair: RepairEntity;
  service: ServicesEntity;
  updatedAt: Scalars['DateTime'];
};

export enum RepairStatusEnum {
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  FINISHED = 'FINISHED',
  HANDLING = 'HANDLING',
  WAITING_FOR_CONFIRM = 'WAITING_FOR_CONFIRM',
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
}

export type RevenueRepair = {
  __typename?: 'RevenueRepair';
  endDate: Scalars['String'];
  price: Scalars['String'];
  startDate: Scalars['String'];
  time: Scalars['String'];
};

export type RevenueRepairInput = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  type: RevenueRepairTypeEnum;
};

export enum RevenueRepairTypeEnum {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

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

export type ServiceConnection = {
  __typename?: 'ServiceConnection';
  items: Array<ServicesEntity>;
  meta: PageMeta;
};

export type ServicesEntity = {
  __typename?: 'ServicesEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
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

export type UpdateBrandInput = {
  id: Scalars['String'];
  models: Array<ModelOfUpdateBrandInput>;
  name: Scalars['String'];
};

export type UpdateContactInput = {
  content?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ContactStatusEnum>;
};

export type UpdateMotorcycleInput = {
  capacity?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  license_plate?: InputMaybe<Scalars['String']>;
  manufacture_year?: InputMaybe<Scalars['String']>;
  model_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type UpdateNewsInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image_url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type UpdateRepairInput = {
  cancelled_description?: InputMaybe<Scalars['String']>;
  capacity: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  description_of_customer?: InputMaybe<Scalars['String']>;
  discount_percent?: InputMaybe<Scalars['Float']>;
  estimated_delivery_time?: InputMaybe<Scalars['DateTime']>;
  expected_receiving_time?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['String'];
  license_plate: Scalars['String'];
  manufacture_year: Scalars['String'];
  model_id: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  products?: InputMaybe<Array<ProductInput>>;
  service_ids?: InputMaybe<Array<Scalars['String']>>;
  staff_id?: InputMaybe<Scalars['String']>;
  status: RepairStatusEnum;
  vehicle_id?: InputMaybe<Scalars['String']>;
};

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type UpdateUserByAdminInput = {
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phonePrefix?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatus>;
};

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
  /** search user by name or phone or username */
  query?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<UserStatus>>;
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
  STAFF = 'Staff',
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
