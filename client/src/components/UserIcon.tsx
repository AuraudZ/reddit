import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function UserIcon() {
  library.add(faUser);
  return (
    <div>
      <FontAwesomeIcon icon={["far", "user"]} />
    </div>
  );
}
