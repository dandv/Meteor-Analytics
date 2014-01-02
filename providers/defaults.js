getSafeUserProfile = function(userId) {

	var user = Meteor.users.findOne({_id: userId});

	if(!user) return null;

	for(var service in user.services) {
		if(service in Providers) return Providers[service](user);
	}
}

_.extend(Providers, {
	facebook: function(user) {
		var service = user.services.facebook;
		return {
			fbid: service.id,
			type: 'facebook',
			first_name: service.first_name,
			last_name: service.last_name,
			name: service.name,
			userId: user._id,
			email: service.email
		}
	},
	password: function(user) {
		var email = user.emails && user.emails[0] && user.emails[0].address;

		return {
			email: email,
			userId: user._id,
			type: 'password'
		}
	},
	twitter: function(user) {
		var service = user.services.twitter;

		var large_avatar = service.profile_image_url.replace('_normal.', '.');

		return {
			id: service.id,
			name: service.screenName,
			avatar: large_avatar,
			type: "twitter"
		}
	},
	github: function(user) {
		var service = user.services.github;
		var profile = user.profile;

		return {
			id: service.id,
			name: (profile && profile.name) || service.username,
			email: service.email,
			username: service.username,
			avatar: service.avatar_url,
			type: "github"
		}
	},
	google: function(user) {
		var service = user.services.google;
		var profile = user.profile;

		return {
			id: service.id,
			name: (profile && profile.name) || service.name,
			email: service.email,
			given_name: service.given_name,
			gender: service.gender,
			avatar: service.picture,
			type: "google"
		}
	},
	weibo: function(user) {
		var service = user.services.weibo;
		var profile = user.profile;

		return {
			id: service.id,
			name: (profile && profile.name) || service.name,
			gender: service.Gender,
			avatar: service.Avatar_large,
			type: "weibo"
		}
	}
});