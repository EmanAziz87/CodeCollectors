import Comment from './Comment';

const TopComment = ({ topLevelComment, post }) => {
  return (
    <div style={{ paddingLeft: 10, borderLeft: '1px solid grey' }}>
      <Comment comment={topLevelComment} post={post} />
      {topLevelComment.childrenComments.map((child) => {
        return (
          <div key={child.id} style={{ paddingLeft: 10 }}>
            <TopComment topLevelComment={child} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default TopComment;
