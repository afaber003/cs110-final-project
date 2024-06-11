// pseudo enum
const PermissionLevel = {
    User: 'user',
    Admin: 'admin'
}

// Use this as the comment "schema"
// ideally this would be stored in a separate bucket rather than on the post object
// but for this small of a project it doesnt really matter
const Comment = {
    userName: '',
    userId: '', // User._id
    text: '', // comment text
    // should add replies and likes and stuff but that would add a lot of complexity to this lol
}

module.exports ={
    PermissionLevel,
    Comment
}