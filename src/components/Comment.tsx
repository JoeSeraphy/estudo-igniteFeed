import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/joeseraphy.png" />
      <div className={styles.commentBox}>
        <div className={styles.content}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Joelson Silva</strong>
              <time
                title="24 de Maio às 10:00:00"
                dateTime="2024-01-24 10:00:00"
              >
                Cerca de 1h atrás
              </time>
            </div>
            <button title="Deltar comentário" onClick={handleDeleteComment}>
              <Trash size={20} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
