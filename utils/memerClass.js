const Eris = require('eris')
const utils = require('./main.js')
const messageCollector = require('./messageCollector.js')
module.exports = class MemerClass {
	constructor () {
		for (const i in Object.keys(utils)) {
			this[Object.keys(utils)[i]] = utils[Object.keys(utils)[i]]
		}
		this.config = require('../config.json')
		this.client = new Eris.Client(this.config.token, {
			disableEvents: this.disabledEvents,
			disableEveryone: true,
			messageLimit: 50,
			maxShards: 16
		})
		this.client.connect()
		this.metrics = require('datadog-metrics')
		this.metrics.init({
			apiKey: this.config.datadog.APIkey,
			appKey: this.config.datadog.APPkey,
			flushIntervalSeconds: 10,
			prefix: 'dank.'
		})
		this.ids = require('../ids.json')
		this.indexes = {
			'meme': {},
			'joke': {},
			'shitpost': {},
			'thonks':{}
		}
		this.snek = require('snekfetch')
		/*
		this.r = require('rethinkdbdash')()
		this.db = require('./dbFunctions.js')(this.r)*/
	}

	createMessageCollector (channel, filter, options) {
		const collector = new messageCollector(channel, filter, options)
		return new Promise(resolve => {
			collector.on('end', (collected, reason) => {
				resolve([collected, reason])
			})
		})
	}

	codeblock (str, lang) {
		return `${'```'}${lang || ''}\n${str}\n${'```'}`
	}

	reply (str, msg) {
		msg.channel.createMessage(`${msg.author.mention}, ${str}`)
	}

	isDonator (userID, donatorLevel) {
		const userRoles = this.client.guilds.get('281482896265707520').members.get(userID).roles
		if (!donatorLevel) {
			return userRoles.includes(this.roleIDs['base'])
		}
		if (userRoles.includes(this.roleIDs[donatorLevel])) {
			return true
		} else if (donatorLevel === '5') {
			return userRoles.includes(this.roleIDs['10'])
		} else {
			return false
		}
	}
}