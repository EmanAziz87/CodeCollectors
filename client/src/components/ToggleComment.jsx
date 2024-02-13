const ToggleComment = () => {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(false);
  const [reply, setReply] = useState(false);

  const [editButton, setEditButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [replyButton, setReplyButton] = useState(false);

  const handleShowEdit = () => {
    setEdit(!edit);
    setComment(!comment);
    setReply(false);
    setEdit;
  };

  const handleShowComment = () => {
    setComment(!comment);
    setEdit(false);
    setReply(false);
  };

  const handleShowForm = () => {
    setReply(!reply);
    setComment(false);
    setEdit(false);
  };

  const toggleEdit = showEdit ? { display: '' } : { display: 'none' };
  const toggleComment = showComment ? { display: 'none' } : { display: '' };
  const toggleReply = showReply ? { display: 'none' } : { display: '' };

  return <div>ToggleComment</div>;
};

export default ToggleComment;
