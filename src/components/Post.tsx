import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setCommets] = useState(["wow, muito bom"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormated = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewComment(event: FormEvent) {
    event.preventDefault();

    setCommets([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleDeleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setCommets(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <>
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
            <Avatar hasBorder src={post.author.avatarUrl} />
            <div className={styles.authorInfo}>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
            </div>
          </div>
          <time
            title={publishedDateFormated}
            dateTime={post.publishedAt.toISOString()}
          >
            {publishedDateRelativeToNow}
          </time>
        </header>
        <div className={styles.content}>
          {post.content.map((line) => {
            if (line.type === "paragraph") {
              return <p>{line.content}</p>;
            } else if (line.type === "link") {
              return (
                <p>
                  <a href="#">{line.content}</a>
                </p>
              );
            }
          })}
        </div>
        <form onSubmit={handleNewComment} className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea
            placeholder="Deixe um comentário"
            name="comment"
            value={newCommentText}
            onInvalid={handleNewCommentInvalid}
            onChange={handleNewCommentChange}
            required
          />
          <footer>
            <button type="submit" disabled={isNewCommentEmpty}>
              Publicar
            </button>
          </footer>
        </form>
        <div className={styles.commentList}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={handleDeleteComment}
              />
            );
          })}
        </div>
      </article>
    </>
  );
}
