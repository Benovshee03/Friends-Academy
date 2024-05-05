import React, { useState, useMemo } from "react";
import { Button, Drawer, Space, Tree } from "antd";
import PermissionNames from "../../../common/utils/PermissionNames";

export interface IRolePermissionProps {
  open: boolean;
  onClick: () => void;
  permissions: any[];
}

const RolePermission: React.FC<IRolePermissionProps> = ({
  open,
  onClick,
  permissions,
}) => {
  const getPermissionTitle = (name: string) =>
    PermissionNames[name as keyof typeof PermissionNames];

  const data = useMemo(
    () =>
      permissions
        .filter((item) => item.name.startsWith("Pages"))
        .map((item) => ({
          title: getPermissionTitle(item.name),
          key: item.name,
          children: permissions
            .filter(
              (c) =>
                c.name !== item.name &&
                c.name.startsWith("Action") &&
                c.name.includes(getPermissionTitle(item.name))
            )
            .map((child) => ({
              title: getPermissionTitle(child.name),
              key: child.name,
              children: permissions
                .filter(
                  (s) =>
                    !(
                      s.name.startsWith("Pages") || s.name.startsWith("Action")
                    ) &&
                    s.name !== child.name && 
                    s.name.includes(child.name)
                )
                .map((subChild) => ({
                  title: getPermissionTitle(subChild.name)  ,
                  key: subChild.name,
                })),
            })),
        })),
    [permissions]
  );

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onCheck = (
    checkedKeysValue:
      | React.Key[]
      | { checked: React.Key[]; halfChecked: React.Key[] }
  ) => {
    const checkedKeys = Array.isArray(checkedKeysValue)
      ? checkedKeysValue
      : checkedKeysValue.checked;
    console.log("onCheck", checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={onClick}>
          Open Large Size (736px)
        </Button>
      </Space>
      <Drawer
        title="Large Drawer"
        placement="right"
        size="large"
        onClose={onClick}
        open={open}
        extra={
          <Space>
            <Button onClick={onClick}>Cancel</Button>
            <Button type="primary" onClick={onClick}>
              OK
            </Button>
          </Space>
        }
      >
        <Tree
          checkable
          onExpand={setExpandedKeys}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={(selectedKeysValue, info) => {
            console.log("onSelect", info);
            setSelectedKeys(selectedKeysValue);
          }}
          selectedKeys={selectedKeys}
          treeData={data}
        />
      </Drawer>
    </>
  );
};

export default RolePermission;