package com.github.glogloe.emailservice.repository.model.mapper;

import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.repository.model.address.Address;
import com.github.glogloe.emailservice.repository.model.address.CCAddress;
import com.github.glogloe.emailservice.repository.model.address.FromAddress;
import com.github.glogloe.emailservice.repository.model.address.ToAddress;
import com.github.glogloe.emailservice.repository.model.email.Email;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public final class EmailMapper {

    public static Email toEntity(EmailDTO emailDTO) {
        var to = new ToAddress(emailDTO.to());
        var from = new FromAddress(emailDTO.from());

        var ccSet = emailDTO.cc()
                .stream()
                .flatMap(Collection::stream)
                .map(CCAddress::new)
                .collect(Collectors.toSet());

        var addressSet = new HashSet<>(Set.of(to, from));
        addressSet.addAll(ccSet);

        return new Email(
                addressSet,
                emailDTO.subject(),
                emailDTO.importance(),
                emailDTO.content());
    }

    public static EmailDTO fromEntity(Email email) {
        return new EmailDTO(
                getFrom(email.getAddresses()),
                getTo(email.getAddresses()),
                Optional.of(getCC(email.getAddresses())),
                email.getSubject(),
                email.getImportance(),
                email.getContent());
    }

    private static String getFrom(Set<Address> a) {
        for (var ad : a) {
            if (ad instanceof FromAddress f) {
                return f.getAddress();
            }
        }
        return null;
    }

    private static String getTo(Set<Address> a) {
        for (var ad : a) {
            if (ad instanceof ToAddress f) {
                return f.getAddress();
            }
        }
        return null;
    }

    private static Set<String> getCC(Set<Address> a) {
        var setic = new HashSet<String>();
        for (var ad : a) {
            if (ad instanceof CCAddress f) {
                setic.add(f.getAddress());
            }
        }
        return setic;
    }


}
