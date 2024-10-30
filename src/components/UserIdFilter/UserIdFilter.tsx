import React, { ChangeEvent } from "react";
import styles from "../UserIdFilter/UserIdFilter.module.css";
interface UserIdFilterProps {
  userId: number | null;
  onUserIdChange: (userId: number | null) => void;
}

const UserIdFilter: React.FC<UserIdFilterProps> = ({
  userId,
  onUserIdChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : null;
    onUserIdChange(value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Latest Posts</h1>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="userIdSelect">
          Filter by User:
        </label>
        <select
          className={styles.select}
          value={userId || ""}
          onChange={handleChange}
        >
          <option value="">All Users</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserIdFilter;
