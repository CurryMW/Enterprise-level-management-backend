import React from "react";
import { Button } from "antd";
import storage from "../../utils/storage";

interface Props {}
const WelCome: React.FC<Props> = () => {
  const handleStorage = (value: string) => {
    switch (value) {
      case "set":
        storage.set("name", "zhangsan");
        storage.set("user", { name: "zhangsan", age: 18 });
        break;
      case "get":
        console.log(storage.get("name"));
        break;
      case "remove":
        storage.remove("name");
        break;
      default:
        storage.clear();
        break;
    }
  };
  return (
    <div>
      Welcome
      <Button onClick={() => handleStorage("set")}>设置</Button>
      <Button onClick={() => handleStorage("get")}>获取</Button>
      <Button onClick={() => handleStorage("remove")}>删除</Button>
      <Button onClick={() => handleStorage("clear")}>清空</Button>
    </div>
  );
};

export default WelCome;
