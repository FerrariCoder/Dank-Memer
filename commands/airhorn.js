const file = Math.floor(Math.random() * 2 + 1)

exports.run = async function (Memer, msg) {
	if (!msg.member.voiceState.channelID) {
		await msg.addReaction('❌')
		return Memer.reply('join a voice channel fam', msg)
	}

	if (!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceConnect') ||
		!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceSpeak')) {
		return Memer.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
	}

	if (!Memer.client.voiceConnections.get(msg.channel.guild.id)) {
		msg.addReaction('👍')
		const conn = await Memer.client.joinVoiceChannel(msg.member.voiceState.channelID)
		conn.play(`./assets/horns/${file}.opus`)
		conn.once('end', () => {
			Memer.client.leaveVoiceChannel(msg.channel.guild.id)
		})
	} else {
		await msg.addReaction('❌')
		Memer.reply('I only have one airhorn, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!', msg)
	}
}