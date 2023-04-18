package com.example.jwtsecurity.repository;

import com.example.jwtsecurity.entity.Role;
import com.example.jwtsecurity.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleCustomRepo {
    @PersistenceContext
    private EntityManager entityManager;
    public List<Role> getRoles(User user) {
        StringBuilder sql = new StringBuilder()
                .append("SELECT r.name AS name ")
                .append("FROM users u JOIN users_roles ur ON u.id = ur.users_id ")
                .append("JOIN roles r ON r.id = ur.roles_id ");
        sql.append("WHERE  1=1 ");
        if(user.getEmail() != null){
            sql.append("AND email = :email ");
        }
        NativeQuery<Role> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        if(user.getEmail() != null){
            query.setParameter("email", user.getEmail());
        }
        query.addScalar("name", StandardBasicTypes.STRING);
        query.setResultTransformer(Transformers.aliasToBean(Role.class));
        return query.list();
    }
}
