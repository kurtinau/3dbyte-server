module.exports= {
    mutation: `
    setAddressPrimary(input: deleteAddressInput!): Address!
  `,
  resolver:{
      Mutation:{
        setAddressPrimary:{
            description: 'Set a Address as primary Address',
            resolverOf: 'application::address.address.update',
            resolver: 'application::address.address.setPrimary',
        }
      },
  },
}