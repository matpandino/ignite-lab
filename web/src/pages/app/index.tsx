import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { withApollo } from "../../lib/withApollo";
import { useGetProductsQuery } from "../../graphql/generated/graphql";
import {
  getServerPageGetProducts,
  ssrGetProducts,
  useMe,
} from "../../graphql/generated/page";

export function Home({data}) {
  const { user } = useUser();
  const { data: me, loading, error } = useMe();

  return (
    <div>
      <h1>Hello</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return getServerPageGetProducts(null, ctx);
    return {
      props: {}
    }
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
