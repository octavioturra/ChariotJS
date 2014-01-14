module.exports = function(i18n){
	return{
		success : function(data){
			return {
				success: true,
				data: data
			};
		},
		error : function(errno, message){
			return {
				success: false,
				errno: errno,
				message: i18n.__(message)
			};
		}
	};
}