import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  ResolveReference,
} from '@nestjs/graphql';
import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  async me(@CurrentUser() user: AuthUser) {
    console.log('user', user.sub);
    const test = await this.customersService.getCustomerByAuthUserId(user.sub);
    console.log('test22', test);
    return test;
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
