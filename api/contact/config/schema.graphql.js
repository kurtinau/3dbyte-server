module.exports= {
    mutation: `
    setContactPrimary(input: deleteContactInput!): Contact!
  `,
  resolver:{
      Mutation:{
        setContactPrimary:{
            description: 'Set a contact as primary contact',
            resolverOf: 'application::contact.contact.update',
            resolver: 'application::contact.contact.setPrimary',
        }
      },
  },
}