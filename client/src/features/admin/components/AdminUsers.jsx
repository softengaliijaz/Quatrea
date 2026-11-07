import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import {
  deleteUser,
  fetchUsers,
  updateUserRole,
} from "../adminSlice";
import { dateFmt } from "../../../utils/makeThunk";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.admin.users);
  const { user: me } = useAuth();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const role = async (id, r) => {
    const res = await dispatch(updateUserRole({ id, role: r }));
    if (res.error) toast.error(res.payload);
    else toast.success("Role updated");
  };
  const remove = async (u) => {
    if (!window.confirm(`Delete ${u.name}'s account?`)) return;
    const res = await dispatch(deleteUser(u.id));
    if (res.error) toast.error(res.payload);
    else toast.success("Account deleted");
  };

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td data-label="Name">{u.name}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Joined">{dateFmt(u.createdAt)}</td>
              <td data-label="Role">
                <select
                  className="input input-sm"
                  value={u.role}
                  disabled={u.id === me.id}
                  onChange={(e) => role(u.id, e.target.value)}
                  aria-label={`Role for ${u.name}`}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>
              <td className="actions">
                {u.id !== me.id && (
                  <button className="link danger" onClick={() => remove(u)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
