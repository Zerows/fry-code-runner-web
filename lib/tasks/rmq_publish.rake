require 'bunny'

namespace :rmq do
  task :publish do
    conn = Bunny.new(:host => "rabbitmq")
    conn.start
    ch = conn.create_channel
    q  = ch.queue("rpc_queue", :auto_delete => true)
    x  = ch.default_exchange

    q.subscribe do |delivery_info, metadata, payload|
      puts "Received #{payload}"
    end

    x.publish("Hello!", :routing_key => q.name)

    # close the connection
    conn.stop
  end
end
