
# fix small bug in => pynats/client.py
def _handle_message(self, result: Match[bytes]) -> None:
    message_data = result.groupdict()

    message_payload_size = int(message_data["size"])
    message_payload = self._readline(size=message_payload_size)
    message_payload = self._strip(message_payload)

    message = NATSMessage(
        sid=int(message_data["sid"].decode()),
        subject=message_data["subject"].decode(),
        reply=message_data["reply"].decode() if message_data["reply"] else "",
        payload=message_payload,
    )

    # Check if the subscription ID exists in the _subs dictionary
    if message.sid in self._subs:
        sub = self._subs[message.sid]
        sub.received_messages += 1

        if sub.is_wasted():
            self._subs.pop(sub.sid)

        sub.callback(message)
    else:
        print(f"Subscription ID {message.sid} not found in _subs dictionary.")

