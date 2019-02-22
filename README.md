# DB設計

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false,unique:true|
|email|string|null: false|

### Association
- has_many :groups,through:members
- has_many :messages
- has_many :members

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|user_name|string|null: false, foreign_key: true|

### Association
- has_many :users,through:members
- has_many :messages
- has_many :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: true|
|image|string||

### Association
- belongs_to :group
- belongs_to :user

