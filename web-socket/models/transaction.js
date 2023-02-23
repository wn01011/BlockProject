const Sequelize = require("sequelize");

module.exports = class TransactionTable extends Sequelize.Model {
  // static == class를 new 하지 않고 메서드를 불러온다.
  static init(sequelize) {
    return super.init(
      {
        hash: {
          type: Sequelize.TEXT,
        },
        blockHash: {
          type: Sequelize.TEXT, // VARCHAR
          allowNull: false,
        },
        chainId: {
          type: Sequelize.STRING(255), // VARCHAR
          allowNull: true,
        },
        from: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        to: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        gas: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        gasPrice: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        input: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nonce: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        r: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        s: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        v: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        transactionIndex: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        type: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        value: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize, // 기본
        timestamps: true, // createAt, updateAt 자동으로 추가
        underscored: true, // 테이블과 컬럼명을 카멜 케이스로 수정
        modelName: "TransactionTable", // Javascript에서 사용하는 테이블명
        tableName: "transactiontable", // MySQL에 있는 테이블명
        paranoid: false, // 삭제 시 deletedAt을 저장할지, 테이블에서 데이터를 삭제 시 아예 삭제를 할 것인가? 아니면 삭제한 날짜를 남김으로써 데이터를 남길 것인가.?
        charset: "utf8mb4", // 언어 포멧 설정
        collate: "utf8mb4_general_ci", // 언어 포멧 설정
      }
    );
  }

  static associate(db) {
    db.TransactionTable.belongsTo(db.BlockTable, {
      foreignKey: "blockNumber",
      targetId: "number",
    });
  }
};
