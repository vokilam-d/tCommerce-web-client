export class CustomerDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export class UpdateCustomerDto implements Pick<CustomerDto, 'firstName' | 'lastName' | 'email'> {
  firstName: string;
  lastName: string;
  email: string;
}

export class UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
