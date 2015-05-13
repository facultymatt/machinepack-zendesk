module.exports = {

  friendlyName: 'Say hello',
  description: 'Log a hello message with a generated secret code and other information',
  extendedDescription: 'This example machine is part of machinepack-boilerplate, used to introduce everyone to machines.',

  inputs: {
    username: {
      example: 'matt@machines.edu',
      description: 'The email of a Zendesk user account',
      required: true
    },
    token: {
      example: 'fjPCIjPEjCBfgwlfjPCIjPEjCBfgwl',
      description: 'API token for access',
      required: true
    },
    remoteUri: {
      example: 'https://machines.zendesk.com/api/v2',
      description: 'API for your zendesk instance',
      required: true
    },
    requestorName: {
      example: 'Customer',
      description: 'Name of ticket requestor',
      required: true
    },
    requestorEmail: {
      example: 'customer@gmail.com',
      description: 'Email of ticket requestor',
      required: true
    },
    subject: {
      example: 'I need help with assembly',
      description: 'Short title for ticket',
      required: true
    },
    tags: {
      example: [],
      description: 'Array of tags for ticket',
      required: false
    },
    comment: {
      example: 'When I opened the box the parts were missing. I need new parts.',
      description: 'Detailed comment for ticket',
      required: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'An unexpected error occurred.'
    },
    success: {
      example: {}
    }
  },

  fn: function(inputs, exits) {

    var zendesk = require('node-zendesk');

    var client = zendesk.createClient({
      username: inputs.username,
      token: inputs.token,
      remoteUri: inputs.remoteUri
    });

    var ticket = {
      'ticket': {
        requester: {
          name: inputs.requestorName,
          email: inputs.requestorEmail,
        },
        tags: inputs.tags,
        subject: inputs.subject,
        comment: {
          body: inputs.comment || '<no comment provided>'
        }
      }
    };

    console.log(ticket);

    client.tickets.create(ticket, function(err, req, result) {
      if (err) {
        exits.error(err);
      }
      exits.success(result);
    });

  }

};